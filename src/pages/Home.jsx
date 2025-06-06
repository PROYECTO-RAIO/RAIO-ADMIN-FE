import BasicButton from '../components/BasicButton/BasicButton';
import './Home.css';

function Home() {
    return(
        <>
        <h1>Inicio (eventual login)</h1>
        <BasicButton className="btn-primary-custom" size="small">grey</BasicButton>
        <BasicButton className="btn-secondary-custom" size="large">yellow</BasicButton>
        <BasicButton className="btn-accent-custom" size="small">green</BasicButton>
        </>
    )
}

export default Home;