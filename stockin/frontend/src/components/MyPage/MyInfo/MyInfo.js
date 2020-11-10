import React, { useState, useEffect } from 'react';
import { Button, Form, Header, Icon, Image, Input, Modal, Label, Grid } from 'semantic-ui-react';

import { api } from '../../../api/index';



const MyInfo = (props) => {
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [nicknameInput, setNicknameInput] = useState('');
    const [edit, setEdit] = useState(false);


    useEffect( ()=>{
        api.get('/users/userInfo/').then((response)=>{
            setEmail(response.data['email']);
            setNickname(response.data['nickname']);
           
        })
    
    })

    const changeNick = () => {
        api.put('/users/userInfo/', {'change':'nickname', 'email':email ,'nickname':nicknameInput})
        setEdit(false)
        alert('nickname changed succesfully');
    }

    const clickEdit=()=>{
        setEdit(true)
        setNicknameInput(nickname)
    }

    
    if(!edit)
        return (
            <div className="MyInfo" data-testid="MyInfo">
                <Grid centered>
                    <Grid.Row>
                        <Label> email </Label>
                        {email}
                    </Grid.Row>
                    <Grid.Row>
                        <Label> nickname {edit} </Label>
                        {nickname}
                    </Grid.Row>
                    <Grid.Row>
                        <Button onClick={()=>clickEdit()}>Edit!</Button>
                    </Grid.Row>
                </Grid>

            </div>
        );
    else
        return (
            <div className="MyInfo" data-testid="MyInfo">
                <Grid centered>
                    <Grid.Row>
                        <Label> email </Label>
                        {email}
                    </Grid.Row>
                    <Grid.Row>
                        <Label> nickname {edit} </Label>
                        <Input 
                            value={nicknameInput}
                            onChange={(event) => setNicknameInput(event.target.value)}
                        />
                    </Grid.Row>
                    <Grid.Row>
                        <Button onClick={()=>changeNick()}>Confirm!</Button>
                        <Button onClick={()=>setEdit(false)}>Cancel!</Button>
                    </Grid.Row>
                </Grid>

            </div>
        );
    
};

export default MyInfo;
