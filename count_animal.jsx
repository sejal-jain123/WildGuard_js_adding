import { useEffect, useState } from "react";
import axios from "axios";
import "./count.css";

function count() {
  const [time, setTime] = useState(10); // Initial value set to 10
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(10); // Separate state for input

  useEffect(() => {
    axios
      .get(
        "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/counter1.json"
      )
      .then((response) => {
        const value = response?.data || 10;
        setTime(value);
        setInputValue(value); // Update input with the initial value
      })
      .catch((err) => console.log(err));
  }, []);

  // Update API when value changes (debounced)
  const updateAPI = async (value) => {
    setLoading(true);
    await axios.put(
      "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json",
      value
    );
    setLoading(false);
  };

  // Debounce function to delay the API call after input changes
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // Handle increment
  const increment = () => {
    const newValue = time + 1;
    setTime(newValue);
    setInputValue(newValue);
    updateAPI(newValue);
  };

  // Handle decrement
  const decrement = () => {
    const newValue = time - 1;
    setTime(newValue);
    setInputValue(newValue);
    updateAPI(newValue);
  };

  // Handle input change with debounce
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    setInputValue(value);
    debounceUpdateAPI(value);
  };

  const debounceUpdateAPI = debounce((value) => {
    setTime(value); // Set the main time state
    updateAPI(value); // Update API after debouncing
  }, 500);

  return (
    <div className="container">
      <div className="time_container">
        <div className="saving_status">
          {loading && <div className="loader">Loading...</div>}
        </div>

        <div className="timer_section">
          <div className="sub_button" onClick={decrement}>
            -
          </div>
          <div className="input_container">
            <input
              type="number"
              className="number_input"
              value={inputValue}
              onChange={handleInputChange} // Update on input change
            />
          </div>
          <div className="add_button" onClick={increment}>
            +
          </div>
        </div>
        <div className="count_text">Counter Value: {time}</div>
      </div>
    </div>
  );
}

export default count;


//count number of anim,als in the zoo or the area anything
