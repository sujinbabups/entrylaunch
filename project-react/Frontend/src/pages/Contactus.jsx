import React from 'react'

const Contactus = () => {
  return (
    <>
     <div className=" w-3/4 max-w-3xl p-4 bg-white rounded-2xl m-auto mt-[-860px]">
      <h2 className="text-3xl font-bold font-serif text-center">Contact Us</h2>
      <div className="w-3/4 bg-gradient-to-t from-gray-700 to-gray-400 m-auto rounded-lg p-4">
        <form className="flex flex-col space-y-4">
          <div>
            <label className="block text-white text-lg mb-2" htmlFor="name">Name</label>
            <input
              className="w-full p-2 rounded border border-gray-300"
              type="text"
              id="name"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-white text-lg mb-2" htmlFor="email">Email</label>
            <input
              className="w-full p-2 rounded border border-gray-300"
              type="email"
              id="email"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label className="block text-white text-lg mb-2" htmlFor="message">Message</label>
            <textarea
              className="w-full p-2 rounded border border-gray-300"
              id="message"
              rows="4"
              placeholder="Your Message"
            ></textarea>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    
    </>
  )
}

export default Contactus
