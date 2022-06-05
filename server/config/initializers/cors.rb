Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins [ENV['WEB1'], ENV['WEB2']]
    resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head], credentials: true
  end
end
