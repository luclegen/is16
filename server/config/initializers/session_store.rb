# Rails.application.config.session_store :cookie_store
Rails.application.config.session_store :mongoid_store
MongoSessionStore.collection_name = 'sessions'
