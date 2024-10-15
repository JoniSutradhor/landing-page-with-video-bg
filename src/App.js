import ConcernsSlider from "./ConcernsSlider";
import { DataProvider } from "./contexts/DataContext";
import VideoSlider from "./VideoSlider";

function App() {
  return (
    <DataProvider>
      <VideoSlider />
      <ConcernsSlider />
    </DataProvider>
  );
}

export default App;
