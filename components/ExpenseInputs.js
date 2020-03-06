import React from "react";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const ExpenseInputs = props => {
  return (
    <>
      <Input
        label="Title"
        value={props.expense.title}
        onChangeText={title => props.dispatch({ type: "title", field: title })}
        inputStyle={{ padding: 10 }}
      />
      <Input
        label="Date"
        value={props.expense.date}
        onChangeText={date => props.dispatch({ type: "date", field: date })}
        inputStyle={{ padding: 10 }}
        leftIcon={<Icon name="calendar" size={24} color="black" />}
      />
      <Input
        label="Amount"
        value={props.expense.amount.toString()}
        onChangeText={amount =>
          props.dispatch({ type: "amount", field: amount })
        }
        inputStyle={{ padding: 10 }}
        leftIcon={<Icon name="money" size={24} color="black" />}
      />
      <Input
        label="Notes"
        value={props.expense.notes}
        onChangeText={notes => props.dispatch({ type: "notes", field: notes })}
        inputStyle={{ padding: 10 }}
        leftIcon={<Icon name="sticky-note" size={24} color="black" />}
      />
      {props.children}
    </>
  );
};

export default ExpenseInputs;
