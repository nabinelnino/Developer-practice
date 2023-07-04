import React, { useState } from "react";
const questions = [
    {
      id: 1,
      question: "Select your favorite color",
      options: ["Red", "Blue", "Green"],
    },
    {
      id: 2,
      question: "Select your favorite fruit",
      options: {
        Red: ["Apple", "Strawberry", "Cherry"],
        Blue: ["Blueberry", "Grape", "Plum"],
        Green: ["Kiwi", "Lime", "Avocado"],
      },
    },
    {
      id: 3,
      question: "Select your favorite animal",
      options: {
        Apple: ["Dog", "Cat", "Rabbit"],
        Strawberry: ["Lion", "Tiger", "Bear"],
        Cherry: ["Elephant", "Giraffe", "Monkey"],
        Blueberry: ["Dolphin", "Whale", "Shark"],
        Grape: ["Penguin", "Ostrich", "Peacock"],
        Plum: ["Kangaroo", "Koala", "Emu"],
        Kiwi: ["Fox", "Wolf", "Coyote"],
        Lime: ["Horse", "Cow", "Sheep"],
        Avocado: ["Turtle", "Snake", "Crocodile"],
      },
    },
  ];
  




const Form = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (questionId, option) => {
    setSelectedOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      const existingOptionIndex = updatedOptions.findIndex(
        (option) => option.questionId === questionId
      );

      if (existingOptionIndex !== -1) {
        updatedOptions[existingOptionIndex].selectedOption = option;
      } else {
        updatedOptions.push({ questionId, selectedOption: option });
      }

      return updatedOptions;
    });
  };

  return (
    <div>
      {questions.map((question) => (
        <div key={question.id}>
          <h3>{question.question}</h3>
          <select
            value={
              selectedOptions.find((option) => option.questionId === question.id)
                ?.selectedOption || ""
            }
            onChange={(e) => handleOptionChange(question.id, e.target.value)}
          >
            <option value="">Select an option</option>
            {Array.isArray(question.options) ? (
              question.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))
            ) : (
              Object.entries(question.options).map(([key, value]) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))
            )}
          </select>
        </div>
      ))}

      <button onClick={() => console.log(selectedOptions)}>
        Submit Answers
      </button>
    </div>
  );
};

export default Form;
