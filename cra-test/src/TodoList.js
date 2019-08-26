import React, { Component } from 'react';

class TodoList extends Component {
    state = {
        todos: [],
    };

    onClick = () => {
        import('./Todo.js').then(({ Todo }) => {
            const { todo } = this.state;
            const position = todo.length + 1;
            const newTodo = <Todo key={position} thitle={`할 일 ${position}`} />;
            this.setState({ todos: [...todos, newTodo] });
        });
    };

    render(){
        const { todos } = this.state;
        return (
            <div>
                <button onClick={this.onClick}>할 일 추가</button>
                {this.state.todos}
            </div>
        );
    }
}

export default TodoList;