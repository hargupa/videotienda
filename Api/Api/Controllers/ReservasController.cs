using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Api.Models;

namespace Api.Controllers
{
    public class ReservasController : ApiController
    {
        private videotiendaEntities db = new videotiendaEntities();

        // GET: api/Reservas
        public IQueryable<reserva> Getreserva()
        {
            return db.reserva;
        }

        // GET: api/Reservas/5
        [ResponseType(typeof(reserva))]
        public IHttpActionResult Getreserva(int id)
        {
            reserva reserva = db.reserva.Find(id);
            if (reserva == null)
            {
                return NotFound();
            }

            return Ok(reserva);
        }

        // PUT: api/Reservas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putreserva(int id, reserva reserva)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != reserva.idreserva)
            {
                return BadRequest();
            }

            db.Entry(reserva).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!reservaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Reservas
        [ResponseType(typeof(reserva))]
        public IHttpActionResult Postreserva(reserva reserva)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.reserva.Add(reserva);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = reserva.idreserva }, reserva);
        }

        // DELETE: api/Reservas/5
        [ResponseType(typeof(reserva))]
        public IHttpActionResult Deletereserva(int id)
        {
            reserva reserva = db.reserva.Find(id);
            if (reserva == null)
            {
                return NotFound();
            }

            db.reserva.Remove(reserva);
            db.SaveChanges();

            return Ok(reserva);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool reservaExists(int id)
        {
            return db.reserva.Count(e => e.idreserva == id) > 0;
        }
    }
}