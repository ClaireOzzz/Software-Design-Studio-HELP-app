import React from "react";

import { Container, FormLabel, TextField, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


const Counter = props => {
    // const [count, setCount] = React.useState(0);

    let setCountValue = (e, value) => {
        e.preventDefault()
        if (value < 0 || isNaN(value)) {
            return 0
        }
        props.setCount(value)
    }
    return (
        <div>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={6}>
                    <FormLabel component="legend">{props.label}</FormLabel>
                </Grid>
                <Grid item xs={2}>
                    <Container>
                        <RemoveIcon style={{fill: "#D22108"}} onClick={e => setCountValue(e, props.count - 1)} />
                    </Container>
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        id={`${props.name}-input`}
                        name={props.label}
                        // label={props.label}
                        size="small"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        value={props.count}
                        onChange={e => setCountValue(e, e.target.value)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Container>
                        <AddIcon style={{fill: "#D22108"}} onClick={e => setCountValue(e, props.count + 1)} />
                    </Container>
                </Grid>
            </Grid>
        </div>
    );
}

export default Counter;