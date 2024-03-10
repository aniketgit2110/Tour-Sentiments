import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import DaySchedule from "../shared/Card";
import LoadingAnimation from "../LoadingAnimation";
import { Autocomplete } from "@react-google-maps/api";

function About() {
    const [loading, setLoading] = useState(false);
    const [apiData, setApiData] = useState("");
    const [days, setDays] = useState("");
    const [location, setLocation] = useState("");
    const [interests, setInterests] = useState("");
    const [budget, setBudget] = useState("");
    const [apitext , setapiText] = useState("");
  
    const genAI = new GoogleGenerativeAI(
      "AIzaSyASI3Kr9GoqgvWPYGpwwPLiR27s0h5fzE8"
    );
  
    const fetchData = async () => {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `
        Consider yourself as a trip planner AI:
        * No_of_Days: ${days}
        * Location: ${location}
        * Traveler interests: [${interests}]
        * Traveler budget: ${budget}
        * Accessibility: no physical limitations
        * Generate a detailed trip plan in JSON format for ${days} days, including:
            * Time-wise schedule for each day
            * Hotel suggestions (considering budget and traveler preferences)
            * Rest periods
            * Activity descriptions and estimated durations
            * Recommendations for transportation between locations
            * LIST FORMAT:
            {
              1: {
                "09:00 - 10:30": "Enjoy Breakfast at a Local Cafe in ${location}",
                "11:00 - 13:00": "Discover a Natural Attraction in ${location}",
                "13:30 - 14:30": "Lunch with a Scenic View in ${location}",
                "15:00 - 17:00": "Explore Beautiful Landscapes around ${location}",
                "18:00 - 19:00": "Relax by the Hotel Pool in ${location}",
                "19:30 - 21:00": "Dine at a Cozy Restaurant in ${location}",
              },
              2: {
                "09:00 - 10:30": "Start the Day with Hotel Breakfast in ${location}",
                "11:00 - 13:00": "Explore Nature at ${location}'s Sanctuary",
                "13:30 - 14:30": "Lunch in a Nature-Inspired Setting in ${location}",
                "15:00 - 17:00": "Enjoy Boating at a Picturesque Lake near ${location}",
                "18:00 - 19:00": "Visit a Local Art Gallery in ${location}",
                "19:30 - 21:00": "Dinner with a Lovely View in ${location}",
              },
              3: {
                "09:00 - 10:30": "Morning Yoga by the Beach in ${location}",
                "11:00 - 13:00": "Discover Historical Sites in ${location}",
                "13:30 - 14:30": "Lunch at a Cliffside Restaurant in ${location}",
                "15:00 - 17:00": "Adventurous Activities on the Beach in ${location}",
                "18:00 - 19:00": "Relax with a Spa Session in ${location}",
                "19:30 - 21:00": "Dinner with Live Music in ${location}",
              },
              4: {
                "09:00 - 10:30": "Breakfast at a Beachside Bakery in ${location}",
                "11:00 - 13:00": "Explore a Vibrant Market in ${location}",
                "13:30 - 14:30": "Seafood Lunch by the Beach in ${location}",
                "15:00 - 17:00": "Thrilling Water Activities at ${location}'s Beach",
                "18:00 - 19:00": "Relaxation by the Pool in ${location}",
                "19:30 - 21:00": "Dinner with Fusion Cuisine in ${location}",
              },
              5: {
                "09:00 - 10:30": "Coastal Cafe Breakfast in ${location}",
                "11:00 - 13:00": "Visit a Local Museum in ${location}",
                "13:30 - 14:30": "Lunch at an Art-Themed Restaurant in ${location}",
                "15:00 - 17:00": "Explore Spice Plantations in ${location}",
                "18:00 - 19:00": "Relax at a Beachside Lounge in ${location}",
                "19:30 - 21:00": "Seafood Grill Dinner in ${location}",
              },
            }
        `;

        console.log("API Request Prompt:", prompt);
        try {
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const text = await response.text();
      
          console.log("API Response:", text);
      
          try {
            const trimmedResponse = text.split("\n").slice(1, -1).join("\n");
            console.log("Trimmed Response:", trimmedResponse);
      
            const schedule = JSON.parse(trimmedResponse);
            setApiData(trimmedResponse);
            setLoading(false);
          } catch (parseError) {
            console.error("Error parsing JSON:", parseError);
            setLoading(false);
          }
        } catch (apiError) {
          console.error("Error fetching data from API:", apiError);
          setLoading(false);
        }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      fetchData();
    };
  
    const renderSchedule = () => {
      if (apiData === "") return null;
      try {
        const schedule = JSON.parse(apiData);
        return (
          <div>
            {Object.entries(schedule).map(([day, activities]) => (
              <DaySchedule key={day} day={day} schedule={activities} place={location} />
            ))}
          </div>
        );
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        return <div>Error parsing JSON</div>;
      }
    };
    
  
    return (
      <div className="container">
        <div className="mt-5 mb-5">
        <form onSubmit={handleSubmit}>
            <div className="row d-flex align-items-end">
              <div className="col-lg-2">
                <label htmlFor="days" className="form-label">
                  No of Days
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="days"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                />
              </div>
              <div className="col-lg-2">
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="col-lg-2">
                <label htmlFor="interests" className="form-label">
                  Interests
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="interests"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                />
              </div>
              <div className="col-lg-2">
                <label htmlFor="budget" className="form-label">
                  Budget
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>
              <div className="col-lg-2">
                <button type="submit" className="btn btn-primary mt-3 col-lg-12" style={{backgroundColor:"orange",}}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="">
          {!loading && renderSchedule()}
          {loading && <LoadingAnimation />}
        </div>
      </div>
    );
  }
  
  export default About;