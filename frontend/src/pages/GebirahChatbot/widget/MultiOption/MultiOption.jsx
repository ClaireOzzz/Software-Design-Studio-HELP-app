import React from "react"
import "./MultiOption.styles.css"

const MultiOption = (props) => {
    // console.log(props.payload)
    return (
        <div className="option-wrapper">
            {props.payload.options.map(option => <div onClick={()=>{
                // console.log(props)
               const botMessage = props.payload.createChatBotMessage(option.text)
            //    console.log(botMessage)
               props.payload.addMessageToState(botMessage)
               props.payload.handleRequest(option.text)
            }
            } className="option-card"> <span className="option-text">{option.text} </span></div>
            )}
        </div>
        
    );
}
export default MultiOption;