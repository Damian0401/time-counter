import Timer from '../timer/Timer';
import styles from './App.module.scss';
import exams from '../../assets/exams.json'

function App() {
  const todayTime = new Date().getTime();
  const sortedExams = exams.sort(e => (new Date(e.date).getTime() < todayTime) ? 1 : -1);

  return (
    <div className={styles.appContainer}>
      <div className={styles.appChildren}>
        {sortedExams.map(e => (
          <Timer key={e.name} name={e.name} date={new Date(e.date)} />
        ))}
      </div>
    </div>
  );
}

export default App;
