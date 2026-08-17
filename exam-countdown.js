const examSchedule = [
  { name: "BIOL 162 - Introduction to Genetics", date: "2026-08-18T09:00:00" },
  { name: "FST 152 - Introduction to Food Science and Technology", date: "2026-08-20T09:00:00" },
  { name: "CHEM 160 - Foundation Chemistry II", date: "2026-08-25T09:00:00" },
  { name: "ENG 158 - Communication Skills II", date: "2026-08-27T09:00:00" },
  { name: "FST 154 - Biochemistry", date: "2026-09-01T09:00:00" },
  { name: "MATHS 172 - Calculus II", date: "2026-09-04T09:00:00" }
];

let activeExamIndex = 0;

function padNumber(value) {
  return value.toString().padStart(2, "0");
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString([], {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function getRemainingTime(targetDate) {
  const difference = new Date(targetDate).getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds, expired: false };
}

function renderCountdown() {
  const container = document.getElementById("exam-countdown");

  if (!container) {
    return;
  }

  const now = Date.now();

  while (
    activeExamIndex < examSchedule.length &&
    new Date(examSchedule[activeExamIndex].date).getTime() <= now
  ) {
    activeExamIndex += 1;
  }

  if (activeExamIndex >= examSchedule.length) {
    container.innerHTML = `
      <div class="exam-countdown-card exam-finished">
        <p class="exam-heading">All exams complete</p>
        <h3>Round finished</h3>
        <p>Every exam countdown has reached zero.</p>
      </div>
    `;
    return;
  }

  const targetExam = examSchedule[activeExamIndex];
  const targetDate = new Date(targetExam.date);
  const remaining = getRemainingTime(targetExam.date);

  const examList = examSchedule
    .map((exam, index) => {
      const examDate = new Date(exam.date).getTime();
      const isCurrent = index === activeExamIndex;
      const isCompleted = examDate <= now;

      return `
        <li class="${isCurrent ? "current" : isCompleted ? "done" : "upcoming"}">
          <span>${exam.name}</span>
          <strong>${isCurrent ? "Live" : isCompleted ? "Done" : "Next"}</strong>
        </li>
      `;
    })
    .join("");

  container.innerHTML = `
    <div class="exam-countdown-card">
      <p class="exam-heading">Current exam</p>
      <h3>${targetExam.name}</h3>
      <div class="timer-grid">
        <div class="timer-box">
          <span>${padNumber(remaining.days)}</span>
          <small>Days</small>
        </div>
        <div class="timer-box">
          <span>${padNumber(remaining.hours)}</span>
          <small>Hours</small>
        </div>
        <div class="timer-box">
          <span>${padNumber(remaining.minutes)}</span>
          <small>Minutes</small>
        </div>
        <div class="timer-box">
          <span>${padNumber(remaining.seconds)}</span>
          <small>Seconds</small>
        </div>
      </div>
      <p class="exam-date">Exam date: ${formatDate(targetExam.date)}</p>
    </div>

    <ul class="exam-list">
      ${examList}
    </ul>
  `;
}

renderCountdown();
setInterval(renderCountdown, 1000);
