# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|name|string|null: false|
### Association
- has_many :groups, through:  user_groups
- has_many :messages
- has_many :user_groups

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false,|
### Association
- has_many :users through: user_groups
- has_many :messages
- has_many :user_groups

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|text| |
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