import db from '../../db/models'
import serviceBase from '../../libs/serviceBase'

export default class GetApiKeyStatus extends serviceBase {
  get constraints () {
    return {
      type: 'object',
      properties: {
        userId: { type: 'string' }
      },
      required: ['userId']
    }
  }

  async run () {
    const { userId } = this.args

    try {
      const user = await db.User.findByPk(userId)

      if (!user) {
        return this.addError(
          'NotFoundErrorType',
          'User not found.'
        )
      }

      const hasApiKey = !!user.geminiApiKey

      return {
        message: 'API Key status retrieved successfully',
        status: 200,
        result: {
          hasApiKey
        }
      }
    } catch (error) {
      console.error('Get API Key Status Error:', error)
      return this.addError(
        'InternalServerErrorType',
        'Failed to get API key status'
      )
    }
  }
}
