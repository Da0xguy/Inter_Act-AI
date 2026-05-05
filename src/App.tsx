import "./App.css";
import { useState } from "react";

interface ExecutionStep {
  id: string;
  title: string;
  description: string;
  status: "pending" | "current" | "completed";
  icon: string;
}

interface ExecutionCardProps {
  step: ExecutionStep;
  position: "top" | "middle" | "bottom" | "exit-up";
}

function ExecutionCard({ step, position }: ExecutionCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-tertiary-container";
      case "current":
        return "text-primary";
      case "pending":
        return "text-on-surface-variant";
      default:
        return "text-on-surface-variant";
    }
  };

  const getCardBackground = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-tertiary-container/5 border-tertiary-container/20";
      case "current":
        return "bg-primary/5 border-primary/20 shadow-[0_0_20px_rgba(0,105,111,0.1)]";
      case "pending":
        return "bg-surface-variant/5 border-outline/20";
      default:
        return "bg-surface-variant/5 border-outline/20";
    }
  };

  const getPositionClass = (pos: string) => {
    switch (pos) {
      case "top":
        return "card-position-top";
      case "middle":
        return "card-position-middle";
      case "bottom":
        return "card-position-bottom";
      case "exit-up":
        return "card-position-exit-up";
      default:
        return "card-position-middle";
    }
  };

  return (
    <div
      className={`glass-card p-6 rounded-2xl border transition-all duration-700 ease-out ${getPositionClass(
        position,
      )} ${getCardBackground(step.status)}`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
            step.status === "current"
              ? "bg-primary/10"
              : "bg-surface-variant/10"
          }`}
        >
          <div className="flex items-center justify-center">
            {step.status === "current" && (
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            )}

            {step.status === "completed" && (
              <span className="material-symbols-outlined text-tertiary-container transition-all duration-300">
                check
              </span>
            )}

            {step.status === "pending" && (
              <div className="w-4 h-4 border-2 border-on-surface-variant rounded-full opacity-50"></div>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className={`font-headline-sm ${getStatusColor(step.status)}`}>
              {step.title}
            </h3>

            {step.status === "current" && (
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                <span className="text-primary text-xs font-medium uppercase tracking-wider">
                  Executing
                </span>
              </div>
            )}
          </div>

          <p className="text-on-surface-variant text-sm leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [currentTask, setCurrentTask] = useState<string | null>(null);
  const [executionSteps, setExecutionSteps] = useState<ExecutionStep[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  const startTask = (taskType: string) => {
    setCurrentTask(taskType);
    setIsExecuting(true);

    const allSteps: ExecutionStep[] = [
      {
        id: "analyze",
        title: "Analyzing Request",
        description: "Processing your command and validating parameters",
        status: "current",
        icon: "analytics",
      },
      {
        id: "validate",
        title: "Validating Transaction",
        description: "Checking wallet balance and network conditions",
        status: "pending",
        icon: "verified",
      },
      {
        id: "execute",
        title: "Executing Transaction",
        description: "Broadcasting transaction to the blockchain",
        status: "pending",
        icon: "send",
      },
      {
        id: "confirm",
        title: "Confirming on Chain",
        description: "Waiting for blockchain confirmation",
        status: "pending",
        icon: "verified_user",
      },
      {
        id: "finalize",
        title: "Finalizing Transaction",
        description: "Recording transaction in ledger",
        status: "pending",
        icon: "done_all",
      },
      {
        id: "complete",
        title: "Transaction Complete",
        description: "Successfully processed your request",
        status: "pending",
        icon: "check_circle",
      },
    ];

    setExecutionSteps([
      { ...allSteps[0], status: "current" },
      { ...allSteps[1], status: "pending" },
      { ...allSteps[2], status: "pending" },
    ]);

    const startDelay = 1200;
    const stepDuration = 2000;
    const finishDelay = 700;

    setTimeout(() => {
      setExecutionSteps([
        { ...allSteps[0], status: "completed" },
        { ...allSteps[1], status: "current" },
        { ...allSteps[2], status: "pending" },
      ]);
    }, startDelay);

    setTimeout(() => {
      setExecutionSteps([
        { ...allSteps[1], status: "completed" },
        { ...allSteps[2], status: "current" },
        { ...allSteps[3], status: "pending" },
      ]);
    }, startDelay + stepDuration);

    setTimeout(
      () => {
        setExecutionSteps([
          { ...allSteps[2], status: "completed" },
          { ...allSteps[3], status: "current" },
          { ...allSteps[4], status: "pending" },
        ]);
      },
      startDelay + stepDuration * 2,
    );

    setTimeout(
      () => {
        setExecutionSteps([
          { ...allSteps[3], status: "completed" },
          { ...allSteps[4], status: "current" },
          { ...allSteps[5], status: "pending" },
        ]);
      },
      startDelay + stepDuration * 3,
    );

    setTimeout(
      () => {
        setExecutionSteps([
          { ...allSteps[4], status: "completed" },
          { ...allSteps[5], status: "current" },
        ]);
      },
      startDelay + stepDuration * 4,
    );

    setTimeout(
      () => {
        setExecutionSteps([{ ...allSteps[5], status: "completed" }]);
        setTimeout(() => {
          setCurrentTask(null);
          setIsExecuting(false);
          setExecutionSteps([]);
        }, finishDelay);
      },
      startDelay + stepDuration * 5,
    );
  };

  return (
    <div className="min-h-screen text-on-surface font-body-md overflow-x-hidden">
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-2xl border-b border-black/10 flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-3">
          <span
            className="material-symbols-outlined text-primary"
            data-icon="bubble_chart"
          >
            bubble_chart
          </span>
          <h1 className="font-spaceGrotesk text-xl font-bold text-primary drop-shadow-[0_0_8px_rgba(0,105,111,0.5)] tracking-widest uppercase">
            Inter_Act AI
          </h1>
        </div>
        <div className="bg-black/5 border border-black/10 px-3 py-1 rounded-full flex items-center gap-2 transition-colors hover:bg-black/10 cursor-pointer">
          <div className="w-1.5 h-1.5 rounded-full bg-tertiary-container shadow-[0_0_8px_rgba(0,109,30,0.6)]"></div>
          <span className="font-data-mono text-primary text-xs tracking-tighter">
            0x...A4F2
          </span>
        </div>
      </header>

      <main className="pt-24 pb-48 px-6 max-w-container-max mx-auto flex flex-col items-center">
        <div className="mb-10 text-center space-y-2 w-full max-w-md">
          <div className="flex items-center justify-center gap-2">
            <span className="font-label-caps text-primary uppercase">
              System Status
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase ${
                isExecuting
                  ? "bg-primary/10 text-primary"
                  : "bg-tertiary-container/10 text-tertiary-container"
              }`}
            >
              {isExecuting ? "Executing" : "Ready"}
            </span>
          </div>
          <h2 className="font-headline-lg text-on-surface">
            {isExecuting ? `Executing: ${currentTask}` : "Inter_Act Interface"}
          </h2>
          <p className="text-on-surface-variant text-sm">
            {isExecuting
              ? "Processing your request across the decentralized network"
              : "AI-powered decentralized operations at your command. Ready to execute any task."}
          </p>
        </div>

        {isExecuting && (
          <div className="w-full max-w-4xl relative h-96 overflow-hidden">
            {executionSteps.slice(0, 3).map((step, index) => {
              const position =
                index === 0 ? "top" : index === 1 ? "middle" : "bottom";
              return (
                <ExecutionCard key={step.id} step={step} position={position} />
              );
            })}
          </div>
        )}

        {!isExecuting && (
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => startTask("Send Money")}
              className="px-6 py-3 bg-primary text-on-primary rounded-lg font-medium hover:bg-primary/90 transition-all"
            >
              Send Money
            </button>
            <button
              onClick={() => startTask("Token Swap")}
              className="px-6 py-3 bg-secondary text-on-secondary rounded-lg font-medium hover:bg-secondary/90 transition-all"
            >
              Token Swap
            </button>
          </div>
        )}
      </main>

      <div className="fixed bottom-24 left-0 w-full flex flex-col items-center justify-center py-4 pointer-events-none">
        <div className="siri-globe"></div>
      </div>

      <nav className="fixed bottom-0 left-0 w-full z-50 bg-white/80 backdrop-blur-3xl border-t border-black/10 flex justify-around items-center h-16 px-4">
        <a
          className="flex flex-col items-center justify-center text-primary drop-shadow-[0_0_5px_rgba(0,105,111,0.8)]"
          href="#"
        >
          <span className="material-symbols-outlined" data-icon="terminal">
            terminal
          </span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-secondary hover:text-primary transition-all active:scale-90"
          href="#"
        >
          <span
            className="material-symbols-outlined"
            data-icon="account_balance_wallet"
          >
            account_balance_wallet
          </span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-secondary hover:text-primary transition-all active:scale-90"
          href="#"
        >
          <span className="material-symbols-outlined" data-icon="history">
            history
          </span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-secondary hover:text-primary transition-all active:scale-90"
          href="#"
        >
          <span className="material-symbols-outlined" data-icon="settings">
            settings
          </span>
        </a>
      </nav>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]"></div>
      </div>
    </div>
  );
}

export default App;
