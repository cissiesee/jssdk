const urls = {
    "production": "",
    "dev": ""
}

const host = process.env.NODE_ENV === "production" ? urls.production : urls.dev;

export default host;