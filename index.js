import React from 'react';
import ReactDOM from 'react-dom';

class PomodoroApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeLeft: 1500,
            isRunning: false,
            mode: 'work',
        };
        this.timerConfigs = {
            work: 1500,
            shortBreak: 300,
            longBreak: 900,
        };
        this.timerId = null;
    }

    toggleTimer = () => {
        this.setState(prevState => ({
            isRunning: !prevState.isRunning
        }), () => {
            if (this.state.isRunning) {
                this.startTimer();
            } else {
                clearInterval(this.timerId);
            }
        });
    };

    startTimer = () => {
        this.timerId = setInterval(() => {
            if (this.state.timeLeft > 0) {
                this.setState(prevState => ({
                    timeLeft: prevState.timeLeft - 1
                }));
            } else {
                this.handleTimerComplete();
            }
        }, 1000);
    };

    resetTimer = () => {
        clearInterval(this.timerId);
        this.setState({
            isRunning: false,
            timeLeft: this.timerConfigs[this.state.mode]
        });
    };

    switchMode = (mode) => {
        clearInterval(this.timerId);
        this.setState({
            mode: mode,
            timeLeft: this.timerConfigs[mode],
            isRunning: false,
        });
    };

    handleTimerComplete = () => {
        clearInterval(this.timerId);
        this.setState({ isRunning: false });
        alert("Time's up!");
        this.resetTimer();
    };

    formatTime = () => {
        const minutes = Math.floor(this.state.timeLeft / 60);
        const seconds = this.state.timeLeft % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    render() {
        const { isRunning, mode } = this.state;
        const tasks = [
            "Finish a project report",
            "Complete a coding exercise",
            "Organize your workspace",
            "Write down tomorrow's tasks",
            "Read a chapter from a book"
        ];
        const quotes = [
            "The future depends on what you do today.",
            "Success is the sum of small efforts, repeated day in and day out.",
            "You don’t have to be great to start, but you have to start to be great.",
            "Believe in yourself and all that you are.",
            "The only limit to our realization of tomorrow is our doubts of today."
        ];
        return (
            <div className="pomodoro-card">
                <h1>Pomodoro Timer</h1>
                <div className="timer-buttons">
                    <button id="workBtn" onClick={() => this.switchMode('work')} className={`mode-btn ${mode === 'work' ? 'active' : ''}`}>Work</button>
                    <button id="shortBreakBtn" onClick={() => this.switchMode('shortBreak')} className={`mode-btn ${mode === 'shortBreak' ? 'active' : ''}`}>Short Break</button>
                    <button id="longBreakBtn" onClick={() => this.switchMode('longBreak')} className={`mode-btn ${mode === 'longBreak' ? 'active' : ''}`}>Long Break</button>
                </div>
                <div className="timer-display">{this.formatTime()}</div>
                <div className="control-buttons">
                    <button id="toggleBtn" onClick={this.toggleTimer} className="control-btn">
                        {isRunning ? "Pause" : "Start"}
                    </button>
                    <button id="resetBtn" onClick={this.resetTimer} className="control-btn">
                        Reset
                    </button>
                </div>
                <div>
                    <SelectInput id="task-select" label="Task" options={tasks} />
                    <SelectInput id="quotes-select" label="Quotes" options={quotes} />
                </div>
            </div>
        );
    }
}

class SelectInput extends React.Component {
    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <select id={this.props.id} className="form-control">
                    {this.props.options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}

ReactDOM.render(<PomodoroApp />, document.getElementById("pomodoro-app"));