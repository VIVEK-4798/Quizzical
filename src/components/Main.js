import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import image1 from "./images/blob 5.png";
import image2 from "./images/blobs.png";

function Main() {
  const [quizQuestion, setQuizQuestion] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [currentPoints, setCurrentPoints] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [inputValue, setInputValue] = useState('')
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  async function combineAllAnswers(incorrectAnswers, correctAnswer) {
    let allAnswers = [...incorrectAnswers, correctAnswer];

    allAnswers.sort(() => Math.random() - 0.5);
    return allAnswers;
  }

  async function getQuizData() {
    try {
      const resp = await axios.get(
        "https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple"
      );

      const questions = resp.data.results.map(async (question) => {
        const answers = await combineAllAnswers(
          question.incorrect_answers,
          question.correct_answer
        );
        return {
          ...question,
          answers,
        };
      });
      const resolvedQuestions = await Promise.all(questions);
      setQuizQuestion(resolvedQuestions);
      setCorrectAnswer(resp.data.results[0].correct_answer);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  }

  useEffect(() => {
    getQuizData();
  }, []);

  const handleAnswerChange = (questionIndex, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answer,
    });
  };
  const handleInputChange = (e) =>{
    setInputValue(e.target.value);
  };
  const handleSubmit = (e) =>{
    e.preventDefault();
    let points = 0;
    quizQuestion.forEach((question, index)=>{
      if(selectedAnswers[index] === question.correct_answer){
        points += 1;
      }
      else if(selectedAnswers[index] !== undefined && selectedAnswers[index] !== question.correct_answer){
        points -= 0;
      }
    });
    setCurrentPoints(points);
    setIsQuizCompleted(true);
  };

  const handleNewQuiz = (() =>{
    setQuizQuestion([]);
    setCorrectAnswer("");
    setCurrentPoints(0);
    setSelectedAnswers({});
    setInputValue("");
    setIsQuizCompleted(false);
    getQuizData();
  })

  return (
    <div className="App flex flex-col justify-center items-center">
      {isQuizCompleted ? (
        <div className="flex flex-col items-center mt-[300px] bg-[#F5F7FB] w-[220px] h-[160px] rounded-[12px]">
          <p className="text-[#293264] text-[24px] mb-[6px] mt-4">
            Your Score : {currentPoints}
          </p>
          <button className="bg-[#4D5B9E] w-[150px] h-[52px] rounded-[14px] mt-[18px] text-white flex justify-center items-center"
          onClick={handleNewQuiz}>
              New Quiz
          </button>
        </div>
      ):(
        <>
        <form onSubmit = {handleSubmit}>
      <div className="bg-[#F5F7FB] w-[800px] h-[800px] flex flex-col justify-center items-center relative mt-[100px] rounded-[12px] p-4">
        {quizQuestion.length === 0 ? (
          <p>Loading...</p>
        ) : (
          quizQuestion.map((question, index) =>(
          <div key={index} className="mb-4">
            <p className="relative text-[#293264] text-center text-[16px] mb-[6px] z-10">
              {question.question}
          </p>
          <fieldset className="flex justify-center w-full flex-wrap gap-3 relative z-10">
          <legend className="sr-only">Answers</legend>
          {question.answers.map((answer,i)=>(
            <div key={i} className="flex justify-center" >
                <label
              htmlFor={`question${index}-answer${i}`}
              className="w-auto h-[22px] flex cursor-pointer items-center justify-evenly rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-700 hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500 has-[:checked]:text-white"
            >
              <input
                type="radio"
                name={`question${index}`}
                value={answer}
                id={`question${index}-answer${i}`}
                checked={selectedAnswers[index] === answer}
                onChange = {()=> handleAnswerChange(index, answer)}
              />
              <p className="text-[12px] font-medium">{answer}</p>
            </label>
          </div>
          ))}
          </fieldset>
          </div>
          ))
          )}
        <img
          src={image1}
          className="absolute top-0 right-0 rounded-[12px] z-0"
          alt=" "
        />
        <img
          src={image2}
          className="absolute bottom-0 left-0 rounded-[12px] z-0"
          alt=" "
        />
      </div>
      <button className="bg-[#4D5B9E] w-[150px] h-[52px] rounded-[14px] mt-[18px] ml-[305px] text-white flex justify-center items-center" 
      type="submit">
        Submit
      </button>
      </form>
      <input
          type="text"
          value={inputValue}
          onChange = {handleInputChange}
      />
      </>
      )}
    </div>
  );
}

export default Main;

