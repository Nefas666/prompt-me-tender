import { useState } from 'react';
import Tippy from '@tippyjs/react';


function TripForm({ onSubmit }) {
    const [numberOfDays, setNumberOfDays] = useState('');
    const [timeOfYear, setTimeOfYear] = useState('');
    const [typeOfTransport, setTypeOfTransport] = useState('');
    const [priceRange, setPriceRange] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({ numberOfDays, timeOfYear, typeOfTransport, priceRange });
    };
  
    return (
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 grid-cols-1 gap-8 text-center md:text-left">
        <div className="input flex flex-col static">
        <Tippy content="How many days you'll be staying away. It can be set in numbers or letters." placement="top" distance={5} delay={100} className="text-xs dark:bg-gray-700 bg-slate-200 shadow-sm shadow-violet-400 dark:shadow-green-200 p-1.5 rounded-md">
          <label
            className="dark:text-green-400 text-violet-500 text-xs font-semibold relative px-2 py-2 bg-transparent"
          >
            ⏱️Number of days
          </label>
          </Tippy>
          <input
            type="text"
            id="numberOfDays"
            value={numberOfDays}
            className="border-violet-400 input px-[10px] py-[11px] text-xs bg-transparent border-2 rounded-[5px] focus:border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-center md:text-left"
            onChange={(e) => setNumberOfDays(e.target.value)}
            placeholder="e.g: 5 or five"
          />
        </div>
        <div className="input flex flex-col static">
        <Tippy content="The preferred season to take your trip." placement="top" distance={5} delay={100} className="text-xs dark:bg-gray-700 bg-slate-200 shadow-sm shadow-violet-400 dark:shadow-green-200 p-1.5 rounded-md">
          <label
            className="dark:text-green-400 text-violet-500 text-xs font-semibold relative px-2 py-2 bg-transparent"
          >
            🌞🌧️Time of the year
          </label>
          </Tippy>
          <input
            type="text"
            id="timeOfYear"
            value={timeOfYear}
            className="border-violet-400 input px-[10px] py-[11px] text-xs bg-transparent border-2 rounded-[5px] focus:border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-center md:text-left"
            onChange={(e) => setTimeOfYear(e.target.value)}
            placeholder="e.g: winter, summer, spring, autumn"
          />
        </div>

        <div className="input flex flex-col static">
        <Tippy content="The method of transport you like most. It can be more than one." placement="top" distance={5} delay={100} className="text-xs dark:bg-gray-700 bg-slate-200 shadow-sm shadow-violet-400 dark:shadow-green-200 p-1.5 rounded-md">

          <label
            className="dark:text-green-400 text-violet-500 text-xs font-semibold relative px-2 py-2 bg-transparent"
          >
            🚗🚂🚆Type of transport
          </label>
          </Tippy>
          <input
            type="text"
            id="typeOfTransport"
            value={typeOfTransport}
            className="border-violet-400 input px-[10px] py-[11px] text-xs bg-transparent border-2 rounded-[5px] focus:border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-center md:text-left"
            onChange={(e) => setTypeOfTransport(e.target.value)}
            placeholder="e.g: car, train and flights, bus"
          />
        </div>
        <div className="input flex flex-col static">
        <Tippy content="The budget you'd like to spend for the trip. It can be set as in the example below. You can use your local currency." placement="top" distance={5} delay={100} className="text-xs dark:bg-gray-700 bg-slate-200 shadow-sm shadow-violet-400 dark:shadow-green-200 p-1.5 rounded-md">

          <label
            className="dark:text-green-400 text-violet-500 text-xs font-semibold relative px-2 py-2 bg-transparent"
          >
            💰Price range
          </label>
          </Tippy>
          <input
            type="text"
            value={priceRange}
            className="border-violet-400 input px-[10px] py-[11px] text-xs bg-transparent border-2 rounded-[5px] focus:border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-center md:text-left"
            onChange={(e) => setPriceRange(e.target.value)}
            placeholder="eg: 500 euros, 200 dollars or 500€, 200$"
          />
        </div>
        <button
          type="submit"
          className="col-span-full text-violet-400 dark:text-green-400 border dark:border-green-400 border-violet-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
        >
          Suggest!
        </button>
      </form>

    );
  }

  export default TripForm;
  