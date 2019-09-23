import React from 'react';

import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './Modal.css';

const modal = props => {

    return (
        <Aux>
            <div className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0',

                }}
            >
                {props.children}
            </div>
            <Backdrop show={props.show} clicked={props.modalClosed} />
        </Aux>
    );
}

export default React.memo(modal, (prevProps, nextProps) => 
    prevProps.show === nextProps.show && 
    prevProps.children === nextProps.children
);