/*
 * This file is part of KylinContainerCloud Console.
 * Copyright (C) 2019 The KylinContainerCloud Console Authors.
 *
 * KylinContainerCloud Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KylinContainerCloud Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KylinContainerCloud Console.  If not, see <https://www.gnu.org/licenses/>.
 */

// Use require.context to require reducers automatically
// Ref: https://webpack.github.io/docs/context.html
const context = require.context('./', false, /\.js$/)
const keys = context.keys().filter(item => item !== './index.js')

const models = []
for (let i = 0; i < keys.length; i += 1) {
  models.push(context(keys[i]))
}

export default models
