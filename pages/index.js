import Head from "next/head"

export default function Home() {
    //How do we show the recently listed NFTs?

    //We will index the events off-chain and then read from our database.
    //Setup a server to listen for those events to be fired, and we will add them to a database to query.
    //The Graph does this in a decentralized way
    /** Moralis does it in a centralized way and comes with a ton of other functions
     * All our logic is still 100% on chain.
     * Speed & Development time.
     * Its really hard to start a prod blockchain project 100% decentralized.
     * They are working on open sourcing their code
     * Feature richness
     * We can create more features with a centralized back end to start
     * AS more decentralized tools are being created
     * Local development
     */
    return <div>Home Page</div>
}
