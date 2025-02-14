import { useEffect, useState } from "react";
import Description from "./Description/Description";
import Options from "./Options/Options";
import Feedback from "./Feedback/Feedback";
import css from "./App.module.css";

const defaultFeedbacks = {
  good: 0,
  neutral: 0,
  bad: 0,
};

const LOCAL_KEY = "feedbacks";

function App() {
  const [feedbacks, setFeedbacks] = useState(() => {
    const initialFeedbacks = localStorage.getItem(LOCAL_KEY);
    if (initialFeedbacks) return JSON.parse(initialFeedbacks);
    else return defaultFeedbacks;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(feedbacks));
  }, [feedbacks]);

  const updateFeedback = (feedbackType) => {
    setFeedbacks({
      ...feedbacks,
      [feedbackType]: feedbacks[feedbackType] + 1,
    });
  };

  const resetHanlder = () => setFeedbacks(defaultFeedbacks);

  const totalFeedback = Object.values(feedbacks).reduce(
    (acc, count) => acc + count,
    0
  );

  const positiveFeedback = Math.round((feedbacks.good / totalFeedback) * 100);

  return (
    <div className={css.container}>
      <Description />
      <Options
        voteHandler={updateFeedback}
        totalFeedback={totalFeedback}
        resetHanlder={resetHanlder}
      />
      {totalFeedback ? (
        <Feedback
          feedback={feedbacks}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <p>No feedback yet</p>
      )}
    </div>
  );
}

export default App;
