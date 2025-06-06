import ReverbCard from "../components/card/ReverbCard";
import Header from "../components/header/Header";
import { useParams } from 'react-router-dom';
import "./View.css";

function View() {
    const { category } = useParams();
    const reverbData = {
    haiku: ["An old silent pond...", "Autumn moonlight—", "The light of a candle"],
    sonoras: ["Sound wave 1", "Echo chamber", "Ambient layer"],
    bot: ["Hello, human.", "How may I help you?", "Initiating protocol 3."]
    };
    const reverbs = reverbData[category] || [];

    return(
        <>
        <Header />
        <h1 className="category-header">{category.toUpperCase()}</h1>
            <section className="view-reverbs">
                {reverbs.length > 0 ? (
                reverbs.map((rev, idx) => (
                    <ReverbCard
                        key={idx}
                        text={rev}
                    />
                ))
                ) : (
                <p>Esta categoría todavia no tiene reverberaciones...</p>
                )}
            </section>
        </>
    )
}

export default View;