# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|string|null: false, foreign_key: true|
|password|string|null: false, foreign_key: true|
|username|string|null: false, foreign_key: true|
### Association
- has_many :groups, through:  user_group
- has_many :messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false, foreign_key: true|
### Association
- has_many :users through: user_group
- has_many :messages

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|imag|text| |
|user_id|string|null: false, foreign_key: true|
|group_id|string|null: false, foreign_key: true|
## association
- belongs_to :user
- belongs_to :group

## user_groupテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group
- belongs_to :massege