        return (
            <AppBar position="static">
                <Toolbar style={{cursor:'pointer',fontVariant:'small-caps',textShadow:'1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue',}}>
                    <Typography onClick={this.onRefresh} style={{fontFamily:'Grinched',fontSize:'2.00rem',fontVariant:'small-caps',color:'orange'}}>SuperMath</Typography>
                    <Typography onClick={() => this.setState({aboutOpen: true})} style={{marginLeft:'1%',fontFamily:'Grinched',fontSize:'2.00rem',color:'green'}}>
                        {header[this.state.lang]['about']}
                    </Typography>
                    <Typography onClick={() => this.setState({helpOpen: true})} style={{marginLeft:'1%',fontFamily:'Grinched',fontSize:'2.00rem',color:'green'}}>
                        
                    </Typography>

                    <Typography variant="h5" style={{flexGrow:1}}></Typography>
                    { (this.state.id > 0) ?
                        (
                         <Typography onClick={() => this.setState({userInfoOpen: true})} style={{fontSize:'2.00rem',fontFamily:'Grinched',color:'orange'}}>
                            {this.state.name} :
                            <font style={{color:'green'}}> {this.state.pass} </font> &#128515;
                            <font style={{color:'red'}}> {this.state.fail} </font> &#128169;
                         </Typography>
                        )
                        :
                        (
                         <Typography onClick={() => this.props.onUpdate('register')} style={{fontSize:'2.00rem',fontFamily:'Grinched',color:'green'}}>
                            {header[this.state.lang]['register']}
                         </Typography>
                        )
                    }

                    { (this.state.id > 0) ?
                        (
                         <Typography onClick={() => this.setState({logoutOpen:true})} style={{marginLeft:'2%',color:'green',fontSize:'2.00rem',fontFamily:'Grinched'}}>
                            {header[this.state.lang]['logout']}
                         </Typography>
                        )
                        :
                        (
                         <Typography onClick={() => this.setState({loginOpen: true})} style={{marginLeft:'2%',color:'orange',fontSize:'2.00rem',fontFamily:'Grinched'}}>
                            {header[this.state.lang]['login']}
                         </Typography>
                        )
                    }

                    <Typography onClick={() => this.setState({langSelector:true})} style={{marginLeft:'1%',fontSize:'2.00rem',fontFamily:'Grinched',color:'green'}}>
                        {header[this.state.lang]['lang']}
                    </Typography>
                </Toolbar>

                <SMHelp open={this.state.helpOpen} onClick={() => this.setState({helpOpen: false})} lang={this.state.lang}/>
                <SMAbout open={this.state.aboutOpen} onClick={() => this.setState({aboutOpen: false})} lang={this.state.lang}/>

                <Login open={this.state.loginOpen} onClose={this.onResult} lang={this.state.lang}/>
                <Forget open={this.state.forgetOpen} onClose={this.onResult} lang={this.state.lang}/>

                <UserInformation open={this.state.userInfoOpen} onUpdate={this.onUserInfo}
                                 id={this.state.id} email={this.state.email}
                                 name={this.state.name} surname={this.state.surname}
                                 age={this.state.age} avatar={this.state.avatar}
                                 pass={this.state.pass} fail={this.state.fail}
                                 lang={this.state.lang}/>

                <Registration open={this.state.registerOpen}
                              onClose={this.onResult}
                              lang={this.state.lang}
                              passed={this.props.passed}
                              failed={this.props.failed}/>

                <Language open={this.state.langSelector} onClose={this.onLanguage} lang={this.state.lang}/>

                <Welcome open={this.state.welcomeOpen}
                         lang={this.state.lang}
                         name={this.state.name}
                         surname={this.state.surname}
                         passed={this.state.pass}
                         failed={this.state.fail}
                         onClose={this.onWelcome}/>

                <AlertDialog open={this.state.logoutOpen}
                             title={header[this.state.lang]['logout_title']}
                             yes={header[this.state.lang]['logout_yes']}
                             no={header[this.state.lang]['logout_no']}
                             name={this.state.name}
                             onClose={this.onResult}/>
            </AppBar>
        )
