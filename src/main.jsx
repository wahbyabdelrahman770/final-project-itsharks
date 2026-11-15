import './index.css';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './contexts/ThemeProvider.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

createRoot(document.getElementById('root')).render(
	<ThemeProvider>
		<BrowserRouter>
			<ScrollToTop>
				<App />
			</ScrollToTop>
		</BrowserRouter>
	</ThemeProvider>
);