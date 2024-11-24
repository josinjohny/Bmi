import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [isWeight, setIsWeight] = useState(true);
  const [isHeight, setIsHeight] = useState(true);
  const [bmi, setBmi] = useState(0);
  const [category, setCategory] = useState("");

  const validate = (e) => {
    const { name, value } = e.target;

    if (!!value.match('^[0-9.]*$')) {
      if (name === 'weight') {
        setWeight(value);
        setIsWeight(true);
      } else if (name === 'height') {
        setHeight(value);
        setIsHeight(true);
      }
    } else {
      if (name === 'weight') {
        setWeight(value);
        setIsWeight(false);
      } else if (name === 'height') {
        setHeight(value);
        setIsHeight(false);
      }
    }
  };

  const calculate = () => {
    if (weight && height) {
      const heightInMeters = height / 100; // Convert height to meters
      const calculatedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(calculatedBmi);

      // Determine BMI category
      if (calculatedBmi < 18.5) setCategory("Underweight");
      else if (calculatedBmi < 24.9) setCategory("Normal weight");
      else if (calculatedBmi < 29.9) setCategory("Overweight");
      else setCategory("Obesity");
    }
  };

  const handleReset = () => {
    setWeight("");
    setHeight("");
    setIsWeight(true);
    setIsHeight(true);
    setBmi(0);
    setCategory("");
  };

  return (
    <>
      <div className='bg-success d-flex justify-content-center align-items-center' style={{ height: '100vh', width: '100%' }}>
        <div className='bg-light p-5 rounded-2' style={{ width: '500px' }}>
          <h1>BMI Calculator</h1>
          <p>Calculate Your Body Mass Index</p>
          <div className='bg-success p-3 mt-4 d-flex justify-content-center align-items-center rounded flex-column' style={{ height: '150px' }}>
            <h1>{bmi > 0 ? bmi : ""}</h1>
            <p>{bmi > 0 ? category : "Your BMI Result"}</p>
          </div>

          <div className='my-3'>
            <TextField
              id="outlined-basic"
              className='w-100'
              value={weight}
              name='weight'
              label="Weight (kg)"
              variant="outlined"
              onChange={(e) => validate(e)}
            />
            {!isWeight && <p className='text-danger'>*Invalid Input</p>}
          </div>

          <div className="mb-3">
            <TextField
              id="outlined-basic"
              className='w-100'
              value={height}
              name='height'
              label="Height (cm)"
              variant="outlined"
              onChange={(e) => validate(e)}
            />
            {!isHeight && <p className='text-danger'>*Invalid Input</p>}
          </div>

          <div className="mb-3 d-flex justify-content-between">
            <Button
              disabled={!isWeight || !isHeight || !weight || !height}
              variant="contained"
              style={{ width: '190px' }}
              color='success'
              className='p-4'
              onClick={calculate}
            >
              Calculate
            </Button>
            <Button
              variant="outlined"
              style={{ width: '190px' }}
              className='p-4 bg-dark text-light'
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
