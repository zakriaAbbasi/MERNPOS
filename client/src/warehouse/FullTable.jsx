import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3F51B5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  button: {
    margin: theme.spacing.unit,
  },
  table: {
    minWidth: 700,
  },
  tablehead : {
    align:'center',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});


class CustomizedTable extends React.Component {
  componentDidMount(){
    var details = {
      'token':this.state.t
      };

  var formBody = [];
  for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
 
 
 fetch('/emp/FetchItems', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
   },
   body: formBody
 })
 .then(res=>res.json())
 .then(res=>{
   if(res){
     console.log(res);
    this.setState({
      data:res
    });
   };
 }
 );   
}

  deleteClick = (index) => {
    console.log({index})
    console.log(this.state.data[index])
    var details = {
      'token':this.state.t,
      'id':this.state.data[index].item_id,
  };
  
 
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  
  
  fetch('/admin/DeleteArticle', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
    },
    body: formBody
  })
  .then(res=>res.json())
  .then(res=>{
 
    //console.log("we are in this function");
    if(res){
      console.log(res);
      var details = {
        'token':this.state.t
    };  
 
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  
  
  fetch('/emp/showallitems', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
    },
    body: formBody
  })
  .then(res=>res.json())
  .then(res=>{
 
    if(res){
     this.setState({
       data:res
     })
    };
  }
  );   
      console.log("After function");
    };
  }
  ); 

  }

  deleteClickHandler = () => {
    this.setState({
      isDisabled:false,
      buttonisDisabled:false,
    })
  }

  constructor(props){
    super(props);
    
    this.state = {
      t:this.props.token,
      data:{},
      id:'',
      
    }

   this.deleteClick =  this.deleteClick.bind(this);
  }
  render() {
    const { classes } = this.props;

  return (
    <Paper className={classes.root}>
    {/*<Search/>*/}
      <Table className={classes.table}>
        <TableHead className={classes.tablehead}>
          <TableRow>
          <CustomTableCell>Sr No.</CustomTableCell>
            <CustomTableCell>Name</CustomTableCell>
            <CustomTableCell >ID</CustomTableCell>
            <CustomTableCell >Price</CustomTableCell>
            <CustomTableCell >Description</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/*data to be replaced with json pacakage from api*/}
          {Object.values(this.state.data).map((type,index) => {
                 console.log(type);
                 return (
                  <TableRow className={classes.row} key={type._id} selectable={true}>
                    <CustomTableCell>{index+1}</CustomTableCell>
                    <CustomTableCell>{type.item_name}</CustomTableCell>
                    <CustomTableCell >{type.item_id}</CustomTableCell>
                    <CustomTableCell >{type.retail_price}</CustomTableCell>
                    <CustomTableCell >{type.description}</CustomTableCell>
                  </TableRow>
            );
          })
          }
        </TableBody>
      </Table>
      </Paper>
  );
}
  }
  

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
