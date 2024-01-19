import { Navbar, Hero, Features, Content, Reviews, Banner, Footer } from '../components'
import { Phone, Team } from '../assets'

const Home = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <Features />
            <Content 
                orientation="right"
                leadingTitle="Send your messages"
                endingTitle="using Wavvy"
                highlightedTitle="easily"
                text="Effortlessly send messages using Wavvy where simplicity meets efficiency. With our user-friendly design connecting with others has become a seamless experience making Wavvy the ideal platform for sending messages with ease."
                image={Phone}
            />

            <div className="hidden lg:flex">
                <Content 
                    orientation="left"
                    leadingTitle="Communicate more"
                    endingTitle="by using Wavvy"
                    highlightedTitle="efficently"
                    text="Experience efficency in your communication with Wavvy where our platform simplifies messaging, video, and image sharing by fostering seamless collboration and quick information exchange. Say goodbye to all potential communication barriers"
                    image={Team}
                />
            </div>
            
            <div className="flex lg:hidden">
                <Content 
                    orientation="right"
                    leadingTitle="Communicate more"
                    endingTitle="by using Wavvy"
                    highlightedTitle="efficently"
                    text="Experience efficency in your communication with Wavvy where our platform simplifies messaging, video, and image sharing by fostering seamless collboration and quick information exchange. Say goodbye to all potential communication barriers"
                    image={Team}
                />
            </div>
            <Reviews />
            <Banner />
            <Footer />
        </div>
    )
}

export default Home