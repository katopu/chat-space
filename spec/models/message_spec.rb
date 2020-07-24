require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
    context 'can save' do
      it 'is valid with content メッセージがあれば保存できるのテスト' do
        expect(build(:message, image: nil)).to be_valid
      end

      it 'is valid with image 画像があれば保存できるのテスト' do
        expect(build(:message, content: nil)).to be_valid
      end

      it 'is valid with content ando image メッセージと画像があれば保存できるのテスト' do
        expect(build(:message)).to be_valid
      end
    end

    context 'can not save' do
      it 'is invalid withuout content and image メッセージも画像も無いと保存できないのテスト' do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include("を入力してください")
      end

      it 'is invalid without group_id group_idが無いと保存できないのテスト' do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      it 'is invalid without user_id user_idが無いと保存できないのテスト' do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end