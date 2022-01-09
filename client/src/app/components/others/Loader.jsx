import React, { Component } from 'react'

export default class Loader extends Component {
  render = () => <main>
    <section className="section-only section-loader">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </section>
  </main>
}
