class APIConfig {
    static apiroot = (process.env.REACT_APP_SECRET) ? "DEPLOYMENT SERVER URL" : "http://localhost:5000/";
}

export default APIConfig;