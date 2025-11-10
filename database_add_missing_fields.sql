-- ============================================
-- SQL Script: Add Missing Fields to users Table
-- Database: ai_recipe_db
-- ============================================
-- 
-- This script adds the missing fields required by the application:
-- - citizenship (VARCHAR for country code, e.g., 'GB', 'US')
-- - date_of_birth (DATE for user's date of birth)
-- - phone (VARCHAR for phone number)
-- - bill_address, bill_address_2, bill_city (for billing information)
--
-- Run this script in phpMyAdmin SQL tab or via MySQL command line
-- ============================================

USE ai_recipe_db;

-- Add citizenship field (country code, e.g., 'GB', 'US', 'EU')
ALTER TABLE `users` 
ADD COLUMN `citizenship` VARCHAR(2) NULL DEFAULT NULL COMMENT 'Country code (ISO 3166-1 alpha-2)' 
AFTER `company`;

-- Add date_of_birth field
ALTER TABLE `users` 
ADD COLUMN `date_of_birth` DATE NULL DEFAULT NULL COMMENT 'User date of birth' 
AFTER `citizenship`;

-- Add phone field
ALTER TABLE `users` 
ADD COLUMN `phone` VARCHAR(20) NULL DEFAULT NULL COMMENT 'User phone number' 
AFTER `date_of_birth`;

-- Add billing address fields (if not already present)
-- Check if bill_address exists first, if not, add it
ALTER TABLE `users` 
ADD COLUMN `bill_address` VARCHAR(255) NULL DEFAULT NULL COMMENT 'Billing address line 1' 
AFTER `phone`;

ALTER TABLE `users` 
ADD COLUMN `bill_address_2` VARCHAR(255) NULL DEFAULT NULL COMMENT 'Billing address line 2' 
AFTER `bill_address`;

ALTER TABLE `users` 
ADD COLUMN `bill_city` VARCHAR(100) NULL DEFAULT NULL COMMENT 'Billing city' 
AFTER `bill_address_2`;

-- ============================================
-- Verification Query (optional - run to check)
-- ============================================
-- DESCRIBE users;
-- ============================================

