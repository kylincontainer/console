/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { List } from 'components/Base'

import Card from './Card'

import styles from './index.scss'

export default class ContainerList extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.array,
    onChange: PropTypes.func,
    onDelete: PropTypes.func,
    onShow: PropTypes.func,
    readOnlyList: PropTypes.array,
    specTemplate: PropTypes.object,
  }

  static defaultProps = {
    className: '',
    name: '',
    value: [],
    readOnlyList: [],
    specTemplate: {},
    onChange() {},
    onShow() {},
    onDelete() {},
  }

  handleAdd = () => {
    this.props.onShow()
  }

  handleEdit = data => {
    this.props.onShow(data)
  }

  handleDelete = container => {
    const { value, specTemplate, onChange, onDelete } = this.props

    if (container.type === 'init' && specTemplate.initContainers) {
      specTemplate.initContainers = specTemplate.initContainers.filter(
        item => item.name !== container.name
      )
      onChange([...value])
    } else {
      onChange(value.filter(item => item.name !== container.name))
    }

    onDelete && onDelete(container.name)
  }

  renderContainers() {
    const { value, readOnlyList } = this.props

    return value.map(item => (
      <Card
        container={item}
        key={item.name}
        onEdit={this.handleEdit}
        onDelete={this.handleDelete}
        readOnly={readOnlyList.includes(item.name)}
      />
    ))
  }

  renderInitContainers() {
    const {
      specTemplate: { initContainers = [] },
    } = this.props

    return initContainers.map(item => (
      <Card
        container={item}
        key={item.name}
        type="init"
        onEdit={this.handleEdit}
        onDelete={this.handleDelete}
      />
    ))
  }

  renderAdd() {
    const {
      value,
      specTemplate: { initContainers = [] },
    } = this.props

    return (
      <List.Add
        type={value.length <= 0 && initContainers.length <= 0 && 'empty'}
        onClick={this.handleAdd}
        icon="docker"
        title={`${t('Add ')}${t('Container Image')}`}
        description={t(
          'KylinContainerCloud supports pulling images from the Image Registries and creating new images through source code (Source to Image).'
        )}
      />
    )
  }

  render() {
    const { className } = this.props

    return (
      <div className={classNames(styles.wrapper, className)}>
        {this.renderInitContainers()}
        {this.renderContainers()}
        {this.renderAdd()}
      </div>
    )
  }
}
