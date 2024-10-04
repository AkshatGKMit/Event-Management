import { useContext } from "react";
import "./SummaryCard.scss";
import DashboardContext from "../../contexts/DashboardContext";

type PropTypes = {
    title: string;
    value: number;
    index: number;
};

const SummaryCard = ({ title, value, index }: PropTypes) => {
    const { activeCard, changeActiveCard } = useContext(DashboardContext);

    return (
        <div
            className={`summary-card ${index === activeCard ? "active" : null}`}
            onClick={() => {
                if (value) changeActiveCard(index);
            }}
        >
            <label className="heading">{title}</label>
            <label className="value">{value}</label>
        </div>
    );
};

export default SummaryCard;
