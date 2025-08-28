import AppRoutes from "./routes/AppRoutes";
import ErrorBoundary from "./middlewares/ErrorBoundary";

function App() {
  return (
    <>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </>
  );
}

export default App;
