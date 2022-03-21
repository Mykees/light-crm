import React from "react";


const HomePage = ({isAuthenticated}) => {

    const welcome = () => {
        if(isAuthenticated){
            return (
                <>
                    <h1 className="display-5 fw-bold border-bottom">Félicitation ! Vous êtes bien connecté !</h1>
                    <p className="col-md-8 fs-4">
                        Vous pouvez maintenant gérer vos clients/factures
                    </p>
                </>
            )
        } else {
            return (
                <>
                    <h1 className="display-5 fw-bold border-bottom">Bienvenue sur Light-crm App</h1>
                    <p className="col-md-8 fs-4">
                        Inscrivez-vous/Connectez-vous pour gérer vos clients/factures
                    </p>
                </>
            )
        }
    }

    return (
        <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
                {welcome()}
            </div>
        </div>
    )
}

export default HomePage;