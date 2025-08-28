import AppRoutes from "./routes/AppRoutes";
import ErrorBoundary from "./middlewares/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <div>
        <AppRoutes />
      </div>
    </ErrorBoundary>
  );
}

export default App;
