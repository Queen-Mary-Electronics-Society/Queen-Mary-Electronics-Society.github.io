# Check if Ruby is installed
$rubyVersion = ruby -v
if (-not $?) {
    Write-Host "Ruby is not installed. Please install Ruby from https://rubyinstaller.org/"
    Write-Host "Make sure to select 'Add Ruby executables to your PATH' during installation"
    Write-Host "After installation, run this script again"
    exit 1
}

Write-Host "Ruby is installed: $rubyVersion"

# Check if bundler is installed
$bundlerVersion = bundle -v
if (-not $?) {
    Write-Host "Installing Bundler..."
    gem install bundler
}

Write-Host "Installing Jekyll dependencies..."
bundle install

Write-Host "Setup complete! You can now run Jekyll with:"
Write-Host "bundle exec jekyll serve" 