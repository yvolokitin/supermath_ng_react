import React from 'react';
import Avatar from '@material-ui/core/Avatar';

export default class Avatars extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeAvatar = this.onChangeAvatar.bind(this);
    }

    onChangeAvatar(newAvatar) {
        console.log('onChangeAvatar ' + newAvatar);
        this.setState({ava: newAvatar});

        // onChangeAvatar /static/media/astronaut-icon.2a916653.png
        // we should save proper value in storage, i.e. astronaut-icon name only
        var index = newAvatar.indexOf('.');
        // '/static/media/' length = 14
        var value = newAvatar.substring(14, index);
        localStorage.setItem('ava', value);
    }

/*
                        <Avatar key={avatar} style={{margin:'10px',width:'120px',height:'120px',cursor:'pointer'}}>
                            <img onClick={() => this.onChangeAvatar(avatar)} src={avatar} alt='avatar'/>
                        </Avatar>
*/
    render() {
        return (
            <div className='avatarsboard'>
                {
                    this.props.avatars.map(avatar => (
                        <Avatar key={avatar} style={{margin:'10px',width:'120px',height:'120px',cursor:'pointer',border:'1px solid red'}}
                                alt="Remy Sharp" src={avatar}/>
                    ))
                }
            </div>
        );
    }
}

/*
                <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer',':hover':{border:'3px solid black'},}}>
                        <img onClick={() => this.onChangeAvatar(ava1)} src={ava1} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava2)} src={ava2} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava3)} src={ava3} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava4)} src={ava4} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava5)} src={ava5} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava6)} src={ava6} alt='test'/>
                    </Avatar>
                </div>

                <div style={{margin:'1%',maxWidth:'100%',display:'flex',alignItems:'center',justifyContent:'center',}}>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava7)} src={ava7} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava8)} src={ava8} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava9)} src={ava9} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava10)} src={ava10} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava11)} src={ava11} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava12)} src={ava12} alt='test'/>
                    </Avatar>
                </div>

                <div style={{margin:'1%',maxWidth:'100%',display:'flex',alignItems:'center',justifyContent:'center',}}>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava13)} src={ava13} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava14)} src={ava14} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava15)} src={ava15} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava16)} src={ava16} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava17)} src={ava17} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava18)} src={ava18} alt='test'/>
                    </Avatar>
*/
