import React from 'react'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
export default class App extends React.Component {
    static async getInitialProps({ query: { page = 1 } }) {
        const pageSize = 10;
        if (page && pageSize) {
            const r = await fetch(`http://localhost:7007/api/fetchItemList?page=${page}&pageSize=${pageSize}`)
            const d = await r.json()
            return {
                items: d,
                page: parseInt(page, 10)
            }
        }
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.items.map(({ name, id }) => (
                        <li key={id}>{name}</li>
                    ))}
                </ul>
                <div
                    style={{ margin: "10px" }}
                >
                    <button
                        onClick={() => Router.push(`/?page=${this.props.page - 1}`)}
                        disabled={this.props.page <= 1}
                        style={{ margin: "10px" }}
                    >
                        PREV
                    </button>
                    <button
                        onClick={() => Router.push(`/?page=${this.props.page + 1}`)}
                        style={{ margin: "10px" }}
                    >
                        NEXT
                    </button>
                </div>
            </div>
        )
    }
}

