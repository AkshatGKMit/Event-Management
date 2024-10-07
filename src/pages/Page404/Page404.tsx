import { CSSProperties } from "react";

const Page404 = () => {
    const styles: CSSProperties = {
        height: "100dvh",
        width: "100dvw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: "3rem",
        fontWeight: "900"
    };
    
    return <div style={styles}>!!404 Page Not Found!!</div>;
}

export default Page404;
