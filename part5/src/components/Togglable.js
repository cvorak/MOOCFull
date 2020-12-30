import React, {useState, useImperativeHandle} from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => setVisible(!visible)

    const hideWhenVisible = {display : visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonName}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonName: PropTypes.string.isRequired
}

export default Togglable