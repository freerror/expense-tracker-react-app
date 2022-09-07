const uuid = jest.createMockFromModule('uuid')
uuid.v4 = () => '0252a5f9-f6c1-469a-acb1-cb6d5b6ff35c'
module.exports = uuid