
import * as React from 'react'
import { Card, Header } from  'semantic-ui-react'
import {Button,Input,Form,} from 'semantic-ui-react'
import axios from 'axios'

export default class Admin extends React.Component {

    constructor(props){
        super(props)
        this.state = {
          applications:[],
          isSignUpModalOpen: false
        }
      }
      componentDidMount () {
        const url = 'http://localhost:4001/applications'
        axios.get(url).then(res =>{
         this.setState({applications:res.data})
        })
      }
      handleSignupClick = (event) =>{
        event.preventDefault()
        this.setState({isSignUpModalOpen:true})
      }
      handleClose = () =>{
        this.setState({isSignUpModalOpen:false})
      }
      handleSignUpSubmit = (data) =>{
        const url = 'http://localhost:4001/application'
        axios.post(url,data)
          .then(res =>{
            console.log("successful application upload")
          }) 
          .catch((err)=>{
            console.log("error",err)
          })    
    
      }
      
      getCardBackHandler = (id) => () => {
        const updatedApplications = this.state.applications.map( (app) => {
          if (id===app.id){
            if (app.status==='Results')
              return{...app, status:'Interview'}
            else if (app.status==='Interview')
              return{...app, status:'Phone Interview'}
            else if(app.status==='Phone Interview')
              return{...app, status: 'Applied'}
            else if(app.status==='Applied')
              return{...app, status:'Interested'}
            return app
          }
          else {
            return app
          }
        })
        
        this.setState({applications:updatedApplications})
    
      }
      getCardForwardHandler = (id) => () => {
        const updatedApplications = this.state.applications.map( (app) => {
          if (id===app.id){
            if (app.status==='Interested')
              return{...app, status:'Applied'}
            else if (app.status==='Applied')
              return{...app, status:'Phone Interview'}
            else if(app.status==='Phone Interview')
              return{...app, status: 'Interview'}
            else if(app.status==='Interview')
              return{...app, status:'Results'}
            return app
          }
          else {
           return app
          }
        })
      
        this.setState({applications:updatedApplications})
    
      }
      applicationToCard = application => {
        const id = application.id
          return {
              header: application.companyName,
              description:(
                <div>
                  <Button color='olive' inverted content="Back" onClick={this.getCardBackHandler(id)}/>
                  <Button color='blue' inverted content="Forward" onClick={this.getCardForwardHandler(id)}/>
                </div>
              ),
              meta: application.position,
              key: id
          }
      }
    
      getCardsByStatus(status) {
        return this.state.applications
          .filter(application => application.status === status )
          .map(this.applicationToCard)
        
      }
      render() {
          const interestApplications = this.getCardsByStatus('Interested')
          const appliedApplications = this.getCardsByStatus('Applied')
          const phoneInterview = this.getCardsByStatus('Phone Interview')
          const interview = this.getCardsByStatus('Interview')
          const results = this.getCardsByStatus('Results')
           
        return (
          <div>
            <div>
              <div className="columns-list"> 
                <div className="column">
                  <Header as="h2" className="column-header">Interested</Header>
                  <Card.Group items={interestApplications} itemsPerRow={1}/>
                </div>
                <div className="column">
                  <Header as="h2" className="column-header">Applied</Header>
                  <Card.Group items={appliedApplications} itemsPerRow={1}/>
                </div>
                <div className="column">
                  <Header as="h2" className="column-header">Phone Interview</Header>
                  <Card.Group items={phoneInterview} itemsPerRow={1}/>
                </div>
                <div className="column">
                  <Header as="h2" className="column-header">Interview</Header>
                  <Card.Group items={interview} itemsPerRow={1}/>
                </div>
                <div className="column">
                  <Header as="h2" className="column-header">Results</Header>
                  <Card.Group items={results} itemsPerRow={1}/>
                </div>
              </div>
            </div>
         
           </div> 
           
        )
      }
    }
    
    