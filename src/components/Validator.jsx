import { useRef } from "react";

export default function Validator() {

    function dateFormat(date) {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }

    let firstNameRef = useRef()

    const handleSubmitForm = (e) => {
        e.preventDefault()

        let dataToSendIDJK = {
            firstName: firstNameRef.current.value
            // other shit
        }
                
        fetch("http://127.0.0.1:3000/save", {
            method: 'POST',
            body:JSON.stringify(dataToSendIDJK),
            headers: {'Content-Type': 'application/json'}
        })
    }


    return (<>

        <div className="container-fluid">

            <div className="row d-flex justify-content-center">

                <h1 className=" text-center bold text-white mb-5 mt-5"> Validity of your credit card</h1>
                <div className="w-50">
                    <div className="mb-4">
                        <h4 className="text-center text-white"> Name on the card</h4>
                    </div>
                    <div className="row mb-5">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input ref={firstNameRef} type="text" className="form-control rounded-3" placeholder="first name"/>
                                <label htmlFor="floatingInput">First Name</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control rounded-3"
                                       placeholder="last name"/>
                                <label htmlFor="floatingInput">Last Name</label>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4"><h4 className="text-center text-white"> Enter your address</h4></div>

                    <div className="form-floating mb-3">
                        <input type="text" className="form-control rounded-3"
                               placeholder="address"/>
                        <label htmlFor="floatingInput">Address</label>
                    </div>
                    <div className="row mb-5">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control rounded-3"
                                       placeholder="city"/>
                                <label htmlFor="floatingInput">City</label>
                            </div>

                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control rounded-3"
                                       placeholder="zip code"/>
                                <label htmlFor="floatingInput">Zip Code</label>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4"><h4 className="text-center text-white"> Verify your credit card</h4></div>

                    <div className="form-floating mb-3">
                        <input type="password" className="form-control rounded-3"
                               placeholder="Credit card number"/>
                        <label htmlFor="floatingInput">Credit card number</label>
                    </div>
                    <div className="row mb-5">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="date" className="form-control rounded-3"
                                       placeholder="Expiraton date" min={2024} />
                                <label htmlFor="floatingInput">Expiration date</label>
                            </div>

                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="number" className="form-control rounded-3"
                                       placeholder="CCV"/>
                                <label htmlFor="floatingInput">CCV</label>
                            </div>
                        </div>
                    </div>

                    <button type="button" className="btn btn-block w-100 btn-success" onClick={handleSubmitForm}>Check credit card</button>

                </div>

            </div>
        </div>
    </>)
}