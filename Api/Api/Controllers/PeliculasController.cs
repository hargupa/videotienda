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
    public class PeliculasController : ApiController
    {
        private videotiendaEntities db = new videotiendaEntities();

        // GET: api/Peliculas
        public IQueryable<pelicula> Getpelicula()
        {
            return db.pelicula;
        }

        // GET: api/Peliculas/5
        [ResponseType(typeof(pelicula))]
        public IHttpActionResult Getpelicula(int id)
        {
            pelicula pelicula = db.pelicula.Find(id);
            if (pelicula == null)
            {
                return NotFound();
            }

            return Ok(pelicula);
        }

        // PUT: api/Peliculas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putpelicula(int id, pelicula pelicula)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != pelicula.idpelicula)
            {
                return BadRequest();
            }

            db.Entry(pelicula).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!peliculaExists(id))
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

        // POST: api/Peliculas
        [ResponseType(typeof(pelicula))]
        public IHttpActionResult Postpelicula(pelicula pelicula)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.pelicula.Add(pelicula);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = pelicula.idpelicula }, pelicula);
        }

        // DELETE: api/Peliculas/5
        [ResponseType(typeof(pelicula))]
        public IHttpActionResult Deletepelicula(int id)
        {
            pelicula pelicula = db.pelicula.Find(id);
            if (pelicula == null)
            {
                return NotFound();
            }

            db.pelicula.Remove(pelicula);
            db.SaveChanges();

            return Ok(pelicula);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool peliculaExists(int id)
        {
            return db.pelicula.Count(e => e.idpelicula == id) > 0;
        }
    }
}