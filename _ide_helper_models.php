<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * App\Models\Memo
 *
 * @property int $id
 * @property string $content
 * @property int $user_id
 * @property string|null $deleted_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|Memo newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Memo newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Memo query()
 * @method static \Illuminate\Database\Eloquent\Builder|Memo whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Memo whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Memo whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Memo whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Memo whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Memo whereUserId($value)
 */
	class Memo extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\MemoTag
 *
 * @property int $memo_id
 * @property int $tag_id
 * @method static \Illuminate\Database\Eloquent\Builder|MemoTag newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MemoTag newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MemoTag query()
 * @method static \Illuminate\Database\Eloquent\Builder|MemoTag whereMemoId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MemoTag whereTagId($value)
 */
	class MemoTag extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Tag
 *
 * @property int $id
 * @property string $name
 * @property int $user_id
 * @property string|null $deleted_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|Tag newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Tag newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Tag query()
 * @method static \Illuminate\Database\Eloquent\Builder|Tag whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tag whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tag whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tag whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tag whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tag whereUserId($value)
 */
	class Tag extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Sanctum\PersonalAccessToken[] $tokens
 * @property-read int|null $tokens_count
 * @method static \Database\Factories\UserFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

