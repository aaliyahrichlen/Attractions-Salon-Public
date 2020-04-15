import React, {useState, useEffect} from 'react';
import ContactCard from "../../components/Contact/ContactCard";
import LoginCard from "../../components/Cards/LoginCard";
import SlideShow from "../../components/SlideShow/SlideShow";
import fire from "../Login/config/Fire";
import Review from '../../components/ReviewSection/Review';
import Footer from "../../components/Footer/Footer";
import "./profile.css";
function Profile() {
    const [userName,setUserName] = useState("");
    const [userEmail,setUserEmail] = useState("");
    const [userPassword,setUserPassword] = useState("");
    const logout = () => {
        fire.auth().signOut();
    }

    useEffect (() => {
        fire.auth().onAuthStateChanged(function(user) {
            if (user) {
                 var db = fire.database();
                var ref = db.ref();
                ref.on("value", function(userSnapshot) {
                    userSnapshot.forEach(function(snapshot) {
                        if(user.email === snapshot.child("email").val()){
                            setUserName(snapshot.child("firstName").val() + " " + snapshot.child("lastName").val());
                        }
                    });
                });
                setUserEmail(user.email);
            } else {
            }
          }); 
    }, [])
    return (
        <div>
        <div className="pageBack">
            <div>
                <LoginCard email = {userEmail} 
                name ={userName}
                logout = {logout}/>
            </div>
        </div>
        <Footer/>
        </div>
    );

    return <div>{Profile}</div>
}

export default Profile;
